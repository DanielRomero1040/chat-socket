const socket = io();

socket.on("message_back", (data)=>{
    console.log(data)
    render(data)
    socket.emit("message client", "hola serrvidor")
})

const render = (data)=>{
    let html = data.map( (element)=>{
        return `
        <p> <strong> ${element.nombre} : </strong> ${element.msn} </p>
        `
    }).join(" ")

    document.getElementById("caja").innerHTML = html;
};

const addMsn = () =>{

    
    let objetoMensaje = {
        
        nombre : document.getElementById("nombre").value,
        msn : document.getElementById("msn").value

    }

    socket.emit("data_client", objetoMensaje)
    document.getElementById("msn").value = ""

    return false
}