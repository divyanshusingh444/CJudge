// alert("hel")

var theme = document.getElementById("themeOptions").value
var language = document.getElementById("modeOptions").value
var userIndent = parseInt(document.getElementById("userIndent").value)
console.log(theme)
console.log(language)
var myCodeMirror = CodeMirror.fromTextArea(document.getElementById("codemirror"), {
    mode: language,
    theme: theme,
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    showTralingSpace: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    indentUnit: userIndent
})

myCodeMirror.foldCode(CodeMirror.Pos(0, 0))
myCodeMirror.setSize(null, "100%");


//theme
function changeTheme() {
    theme = document.getElementById("themeOptions").value
    myCodeMirror.setOption("theme", theme)
}

//mode
function changeMode() {
    language = document.getElementById("modeOptions").value
    myCodeMirror.setOption("mode", language)
}

//save File
function saveFile() {
    let content = myCodeMirror.getValue()
    let fileName = document.getElementById("filename").value
    const file = new File([content], fileName, {
        type: 'text/plain',
      })
      
      function download() {
        const link = document.createElement('a')
        const url = URL.createObjectURL(file)
      
        link.href = url
        link.download = fileName
        document.body.appendChild(link)
        link.click()
      
        setTimeout(function() {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);  
        }, 0); 
      }
      download()
}

//upload File
function uploadFile() {
    
    // alert("hel")
    document.getElementById('inputfile').addEventListener('change', function() {
        var fr=new FileReader();
        fr.readAsText(this.files[0]);
        fr.onload=function(){
            myCodeMirror.setValue(fr.result);
        }
            
    })
}

//update Settings
function updateSettings() {
    // alert("hel")
    userIndent = parseInt(document.getElementById("userIndent").value)
    myCodeMirror.setOption("indentUnit", userIndent)
}


var runButton = document.getElementById('run-button');
var outputTextarea = document.getElementById('output');

// Add a click event listener to the run button
runButton.addEventListener('click', function() {
  // Get the code from the CodeMirror editor
  var code = myCodeMirror.getValue();
  console.log("before fetch")

  // Send a POST request to the server with the C++ code
  fetch('/run3', {
    method: 'POST',
    body: JSON.stringify({ code }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    // Read the response as text
    console.log("responsed")
    return response.text();
  })
  .then(result => {
    console.log(result)
    // Update the output textarea with the result
    outputTextarea.value = result;
  })
  .catch(error => {
    // Update the output textarea with the error
    outputTextarea.value = error.toString();
  });
  console.log('After fetch request');
});