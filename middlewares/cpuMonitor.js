const os = require('os');

let lastCheck = Date.now();
let lastIdle = 0;
let lastTotal = 0;

function getCPUUsage() {
  const cpus = os.cpus();
  let totalIdle = 0, totalTick = 0;
  cpus.forEach(cpu => {
    for (let type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  });
  return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
}

setInterval(() => {
  const { idle, total } = getCPUUsage();
  if (lastTotal !== 0) {
    const idleDiff = idle - lastIdle;
    const totalDiff = total - lastTotal;
    const usage = 100 - Math.floor(100 * idleDiff / totalDiff);
    if (usage > 70) {
      console.log('CPU usage high:', usage + '%');
      process.exit(1); // Use PM2/forever for restart
    }
  }
  lastIdle = idle;
  lastTotal = total;
}, 5000); // Check every 5 seconds

module.exports = (req, res, next) => {
  next();
};