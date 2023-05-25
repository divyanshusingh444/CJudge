const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const fs = require('fs')


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
    res.sendFile(__dirname + '/public/landing.html');
})

app.get('/compiler', (req, res) => {
    console.log(__dirname + '\\compiler.html')
    res.redirect('/compiler.html')
})





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
  

  app.post('/run1', (req, res) => {
    const code = req.body.code;
  
    // Step 1: Save the user's code to a file
    const codeFile = 'userCode1.cpp';
    fs.writeFileSync(codeFile, code);
  
    // Step 2: Compile the code
    const compiler = spawn('g++', [codeFile, '-o', 'output1.exe']);
    compiler.stderr.on('data', (data) => {
      fs.unlinkSync(codeFile); // Cleanup the code file
      res.status(500).send(data.toString());
    });
    compiler.on('close', (code) => {
      if (code !== 0) {
        fs.unlinkSync(codeFile); // Cleanup the code file
        res.status(500).send('Compilation Error');
        return;
      }
  
      // Step 3: Execute the compiled code and capture the output
      const runner = spawn('./output1.exe');
      const input = fs.readFileSync('input1.txt', 'utf-8'); // Assuming input.txt exists
  
      // Step 4: Redirect input and output to files
      const outputFile = 'output1.txt';
      const errorFile = 'error1.txt';
  
      runner.stdin.write(input);
      runner.stdin.end();
  
      let output = '';
      runner.stdout.on('data', (data) => {
        output += data.toString();
      });
  
      runner.stderr.on('data', (data) => {
        fs.writeFileSync(errorFile, data.toString());
      });
  
      runner.on('close', () => {
        // Step 5: Compare output.txt and tc.txt to determine if the code passed or failed
        const expectedOutput = fs.readFileSync('tc1.txt', 'utf-8'); // Assuming tc.txt exists
        const isPass = output.trim() === expectedOutput.trim();
  
        // Step 6: Generate the output message
        const outputMessage = isPass ? 'Pass!' : 'Fail!';
  
        // Cleanup temporary files
        fs.unlinkSync(codeFile);
        fs.writeFileSync(outputFile, output);
  
        res.send(outputMessage);
      });
    });
  });

  app.post('/run2', (req, res) => {
    const code = req.body.code;
  
    // Step 1: Save the user's code to a file
    const codeFile = 'userCode2.cpp';
    fs.writeFileSync(codeFile, code);
  
    // Step 2: Compile the code
    const compiler = spawn('g++', [codeFile, '-o', 'output2.exe']);
    compiler.stderr.on('data', (data) => {
      fs.unlinkSync(codeFile); // Cleanup the code file
      res.status(500).send(data.toString());
    });
    compiler.on('close', (code) => {
      if (code !== 0) {
        fs.unlinkSync(codeFile); // Cleanup the code file
        res.status(500).send('Compilation Error');
        return;
      }
  
      // Step 3: Execute the compiled code and capture the output
      const runner = spawn('./output2.exe');
      const input = fs.readFileSync('input2.txt', 'utf-8'); // Assuming input.txt exists
  
      // Step 4: Redirect input and output to files
      const outputFile = 'output2.txt';
      const errorFile = 'error2.txt';
  
      runner.stdin.write(input);
      runner.stdin.end();
  
      let output = '';
      runner.stdout.on('data', (data) => {
        output += data.toString();
      });
  
      runner.stderr.on('data', (data) => {
        fs.writeFileSync(errorFile, data.toString());
      });
  
      runner.on('close', () => {
        // Step 5: Compare output.txt and tc.txt to determine if the code passed or failed
        const expectedOutput = fs.readFileSync('tc2.txt', 'utf-8'); // Assuming tc.txt exists
        const isPass = output.trim() === expectedOutput.trim();
  
        // Step 6: Generate the output message
        const outputMessage = isPass ? 'Pass!' : 'Fail!';
  
        // Cleanup temporary files
        fs.unlinkSync(codeFile);
        fs.writeFileSync(outputFile, output);
  
        res.send(outputMessage);
      });
    });
  });

  app.post('/run3', (req, res) => {
    const code = req.body.code;
  
    // Step 1: Save the user's code to a file
    const codeFile = 'userCode3.cpp';
    fs.writeFileSync(codeFile, code);
  
    // Step 2: Compile the code
    const compiler = spawn('g++', [codeFile, '-o', 'output3.exe']);
    compiler.stderr.on('data', (data) => {
      fs.unlinkSync(codeFile); // Cleanup the code file
      res.status(500).send(data.toString());
    });
    compiler.on('close', (code) => {
      if (code !== 0) {
        fs.unlinkSync(codeFile); // Cleanup the code file
        res.status(500).send('Compilation Error');
        return;
      }
  
      // Step 3: Execute the compiled code and capture the output
      const runner = spawn('./output3.exe');
      const input = fs.readFileSync('input3.txt', 'utf-8'); // Assuming input.txt exists
  
      // Step 4: Redirect input and output to files
      const outputFile = 'output3.txt';
      const errorFile = 'error3.txt';
  
      runner.stdin.write(input);
      runner.stdin.end();
  
      let output = '';
      runner.stdout.on('data', (data) => {
        output += data.toString();
      });
  
      runner.stderr.on('data', (data) => {
        fs.writeFileSync(errorFile, data.toString());
      });
  
      runner.on('close', () => {
        // Step 5: Compare output.txt and tc.txt to determine if the code passed or failed
        const expectedOutput = fs.readFileSync('tc3.txt', 'utf-8'); // Assuming tc.txt exists
        const isPass = output.trim() === expectedOutput.trim();
  
        // Step 6: Generate the output message
        const outputMessage = isPass ? 'Pass!' : 'Fail!';
  
        // Cleanup temporary files
        fs.unlinkSync(codeFile);
        fs.writeFileSync(outputFile, output);
  
        res.send(outputMessage);
      });
    });
  });
app.listen(3000, () => {
    console.log("Listening on 3000")
})