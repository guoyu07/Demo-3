import child_process from 'child_process';
import path from 'path';
let spawn = child_process.spawn;

function exec(cmd, params, cb) {
  const s = spawn(cmd, params);
  s.on("close", cb);
}

function setParams(cmdParams, device) {
  if(!device) return cmdParams;
  let params = ["-s", device];
  cmdParams.map(param => {
    params.push(param);
  })
  return params;
}

const screencap  = {
  cmd: function(cb, device) {
    const cmd = "adb";
    const time = (new Date()).getTime();
    // TODO - change sdcard with data on some devices
    const screen_name = `screen${time}.png`
    const screen_path = `/sdcard/${screen_name}`;
    const home = process.env.HOME || process.env.USERPROFILE;
    const desktop_path = path.join(home,'Desktop');
    let params = setParams(["shell", "screencap", "-p", screen_path], device);
    exec(cmd, params, (code) => {
      params = setParams(["pull", screen_path, desktop_path], device);
      exec(cmd, params, (code) => {
        params = setParams(["shell", "rm", screen_path], device);
        exec(cmd, params, () => {
          if(cb != null) cb(null, path.join(desktop_path, screen_name));
        }) 
      });  
    });
  }
}

export default function cmd(cb, device) {
  screencap.cmd(cb, device);
}
