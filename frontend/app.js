const SERVER_HOST = 'http://localhost:3011'
const EN_CONNECTED = 'en-connected'
let ioClientId

const ioClient = io.connect(SERVER_HOST,{
  withCredentials: false
})

ioClient.on('connect', () => {
  console.log(`Connected ${ioClient.id}`);
  document.querySelector('#socket-id').innerHTML = `: ${ioClient.id}`
  ioClientId = ioClient.id
})


const elSocketList = document.querySelector(".socket-list")

function triggerData(){
  fetch(`${SERVER_HOST}?socketId=${ioClientId}`)
    .then(async (res) => {
      // const result = await res.text()
    })
    .catch(err =>{
      console.log("ERROR: ", err);
    })
}

ioClient.on(EN_CONNECTED, (data) => {
    console.log(`Socket message arrived: ${data}`);
    const li = document.createElement("li")
    li.classList.add('scale-in-center')
    li.textContent = data
    elSocketList.prepend(li)
})

