const socket = io('/') //reference /connect to socket in the root path 
const videoGrid = document.getElementById('video-grid') //get reference to the grid / place where we put the videos
const myPeer = new Peer(undefined, {
    //undefined to let server generate id
    host: '/',
    port: '3001'
  })

  //var that save call taht we made to that user
  const peers = {}
//refernec to a video
const myVideo = document.createElement('video')
myVideo.muted = true


//connect our video
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  }).then(stream => {
      //video appear
        console.log('hh');
        addVideoStream(myVideo, stream)
        console.log('hh2');
       

        //listen to when someone calls us
        myPeer.on('call', (call) => {
            //answer the call
            call.answer(stream)
            console.log('video sent');
            const video = document.createElement('video')
            //send them our stream
            call.on('stream', userVideoStream => {
              addVideoStream(video, userVideoStream);
            });
          });

          console.log('hh3');
        //allow other users to connect
        socket.on('user-connected', userId => {
            console.log(userId);
            //connectToNewUser(userId, stream)
            setTimeout(connectToNewUser,3000,userId,stream);
          })

  })





//allow new user to connect to my stream

const connectToNewUser=(userId, stream) => {
    //call a specefic user and sending them our stream
    const call = myPeer.call(userId, stream)

    //new video object
    const video = document.createElement('video')

    //when they send us back their video we take their stream
    //taking the stream from the other user and adding it to our custom video element on our page
    console.log("pute");
    console.log(stream);
    call.on('stream', (userVideoStream) => {
        console.log('inside pute');
        addVideoStream(video, userVideoStream);
      
    })
    console.log("pute2");


    //whenever someone leavs call , we remove his video steram
    call.on('close', () => {
      video.remove()
      console.log("pute3");
    })
    //every user is linked to a call we make 
    peers[userId] = call
  }



//pass the id of the user
myPeer.on('open', (id) => {
    //send an event to the server
    socket.emit('join-room', ROOM_ID, id);
  });

//disconnect the connection
  socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
  })


//tell our video object to use the stream
 const addVideoStream=(video, stream) => {
    video.srcObject = stream  //allow to play the video
    video.addEventListener('loadedmetadata', () => {
      video.play();
      videoGrid.append(video); //put video on grid
    });
    
  };