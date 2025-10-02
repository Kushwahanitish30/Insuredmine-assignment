const { parentPort, workerData } = require('worker_threads');
const mongoose = require('mongoose');
const { parseCSV } = require('../utils/csvParser');
const Agent = require('../models/Agent');
const User = require('../models/User');
const Account = require('../models/Account');
const LOB = require('../models/LOB');
const Carrier = require('../models/Carrier');
const Policy = require('../models/Policy');

async function importCSV(filePath) {
  const data = await parseCSV(filePath);
  for (const row of data) {
    // Insert Agent
    let agent = await Agent.findOneAndUpdate(
      { agentName: row.agent },
      { agentName: row.agent },
      { upsert: true, new: true }
    );
    // Insert User
    let user = await User.findOneAndUpdate(
      { email: row.email },
      {
        firstName: row.firstname,
        dob: new Date(row.dob),
        address: row.address,
        phone: row.phone,
        state: row.state,
        zip: row.zip,
        email: row.email,
        gender: row.gender,
        userType: row.userType
      },
      { upsert: true, new: true }
    );
    // Insert Account
    let account = await Account.findOneAndUpdate(
      { accountName: row.account_name },
      { accountName: row.account_name, userId: user._id },
      { upsert: true, new: true }
    );
    // Insert LOB
    let lob = await LOB.findOneAndUpdate(
      { categoryName: row.category_name },
      { categoryName: row.category_name },
      { upsert: true, new: true }
    );
    // Insert Carrier
    let carrier = await Carrier.findOneAndUpdate(
      { companyName: row.company_name },
      { companyName: row.company_name },
      { upsert: true, new: true }
    );
    // Insert Policy
    await Policy.findOneAndUpdate(
      { policyNumber: row.policy_number },
      {
        policyNumber: row.policy_number,
        policyStartDate: new Date(row.policy_start_date),
        policyEndDate: new Date(row.policy_end_date),
        categoryId: lob._id,
        companyId: carrier._id,
        userId: user._id
      },
      { upsert: true, new: true }
    );
  }
}

mongoose.connect(workerData.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => importCSV(workerData.filePath))
  .then(() => {
    parentPort.postMessage('Import completed');
    process.exit(0);
  })
  .catch(err => {
    parentPort.postMessage('Error: ' + err.message);
    process.exit(1);
  });
