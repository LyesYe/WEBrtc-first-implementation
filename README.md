# WEBrtc-first-implementation
for my graduation project , i needed to implement webrtc for a video chat app 


ina first terminal use   "npm run devStart"

in a second terminal  use  "npm i -g peer"  then  "peerjs --port 3001"

if an error like "cannot be loaded because running scripts is disabled on this system.   
For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1"   appear , follow this use these commands :
- set-ExecutionPolicy RemoteSigned -Scope CurrentUser 
- Get-ExecutionPolicy
- Get-ExecutionPolicy -list  
