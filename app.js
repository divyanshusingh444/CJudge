const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const { spawn } = require('child_process');



const app = express()
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });
app.use(bodyParser.json());
const publicPath = path.join(__dirname, 'public');

console.log(__dirname)
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/compiler', (req, res) => {
    console.log(__dirname + '\\compiler.html')
    res.redirect('/compiler.html')
})




// app.post('/run', function(req, res) {
//     // Get the code from the request body
//     console.log("here")
//     var code = req.body.code;
//     console.log(code)
  
//     // Create a child process to execute the code
//     const child = spawn('g++', ['-x', 'c++', '-o', 'output', '-'], { stdio: 'pipe' });
  
//     // Write the code to the child process's stdin
//     child.stdin.write(code);
//     child.stdin.end();
  
//     // Handle the child process's stdout and stderr
//     let output = '';
//     child.stdout.on('data', (data) => {
//         console.log(`stdout: ${data}`);
//       output += data.toString();
//     });
  
//     child.stderr.on('data', (chunk) => {
//       if (chunk) { // Check if chunk is defined
//         console.error(`stderr: ${data}`);
//         res.write(chunk.toString());
//       }
//     });
  
//     // Handle the child process's exit
//     child.on('exit', (code, signal) => {
//       if (code === 0) {
//         // Send the output back to the client
//         res.send(output);
//       } else {
//         // Send the error back to the client
//         res.status(500).send(output);
//       }
//     });
//   });
// app.post('/run', function(req, res) {
//     // Get the code from the request body
//     var code = req.body.code;
//     console.log('Received code:', code);
  
//     // Create a child process to execute the code
//     const child = spawn('g++', ['-x', 'c++', '-o', 'output', '-'], { stdio: 'pipe' });
  
//     // Write the code to the child process's stdin
//     child.stdin.write(code);
//     child.stdin.end();
  
//     // Handle the child process's stdout and stderr
//     let output = '';
//     child.stdout.on('data', (data) => {
//       console.log(`stdout: ${data}`);
//       output += data.toString();
//     });
  
//     child.stderr.on('data', (chunk) => {
//       if (chunk) { // Check if chunk is defined
//         console.error(`stderr: ${chunk}`);
//         res.write(chunk.toString());
//       }
//     });
  
//     // Handle the child process's exit
//     child.on('exit', (code, signal) => {
//       if (code === 0) {
//         // Send the output back to the client
//         res.send(output);
//       } else {
//         // Send the error back to the client
//         res.status(500).send(output);
//       }
//     });
//   });
app.post('/run', (req, res) => {
    const code = req.body.code;
  
    // Compile and run the code
    const compiler = spawn('g++', ['-x', 'c++', '-o', 'output', '-']);
    compiler.stdin.write(code);
    compiler.stdin.end();
    compiler.stderr.on('data', (data) => {
      res.status(500).send(data.toString());
    });
    compiler.on('close', () => {
      const runner = spawn('./output');
      let output = '';
      runner.stdout.on('data', (data) => {
        output += data.toString();
      });
      runner.stderr.on('data', (data) => {
        res.status(500).send(data.toString());
      });
      runner.on('close', () => {
        res.send(output);
      });
    });
  });
  

app.listen(3000, () => {
    console.log("Listening on 3000")
})