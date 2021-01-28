let handlefail = function (err){
    console.log(err)
}


function addVideoStream(streamId){
    let remoteContainer = document.getElementById("remoteStream")
    let streamDiv = document.createElement("div");
    streamId.id = streamId;
    streamDiv.style.transform = "rotateY(180deg)";
    streamDiv.style.height = "720px"
    remoteContainer.appendChild(streamDiv)
}

document.getElementById("join").onlick = function () {
    let channelName = document.getElementById("channelName").value
    let Username = document.getElementById("username").value
    let appId = "a8492c1d6b11444dae409eb2a58eb772"

    let client = AgoraRTC.createClient({
        mode: "live",
        codec: "h264"
    })

    client.init(appId,() => console.log("AgoraRTC Client Connected",handlefail)
    )

    client.join(
        null,
        channelName,
        Username,
        () =>{
            var localStream = AgoraRTC.createStream({
                video: true,
                audio: true,
            })

            localStream.init(function(){
                localStream.play("SelfStream")
                console.log(`App id: ${appId}\nChannel id: ${channelName}`)
            })
        }
    )

    client.on("stream-added", function (evt){
        client.subscribe(evt.stream, handlefail)
    })

    client.on("stream-subscribed", function (evt){
        console.log("Subscribed stream")
        let stream = evt.stream;
        addVideoStream(stream.getId()); 
        stream.play(stream.getId())
    })
}