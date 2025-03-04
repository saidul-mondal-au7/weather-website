
console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{

            if(data.error){
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }

        })
    })
});
//Users/USER/saidul/mongodb/bin/mongod.exe --dbpath=/Users/USER/saidul/mongodb-data
//bash: /Users/USER/saidul/mongodb/bin/mongod.exe: No such file or directory
//%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;C:\Program Files\Git\cmd;C:\Program Files\nodejs\;C:\Program Files\MongoDB\Server\4.2\bin
