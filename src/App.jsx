import { useState,useCallback,useEffect,useRef } from 'react'



function App() {
  const [length,setLength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");

  const passwordRef=useRef(null);

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if(numberAllowed) str+="1234567890";
    if(charAllowed) str+="@!#$%^&*(){}[]~'\"";
    for(let i=1;i<=length;i++){
      let ch=Math.floor(Math.random()*str.length)+1;
      pass+=str.charAt(ch);
    }
    setPassword(pass);
  
  },[length,numberAllowed,charAllowed,setPassword]);
  
  
  useEffect(()=>{
    passwordGenerator();
  },[length,charAllowed,numberAllowed,passwordGenerator]);    

  return (
    <>
      <div className="w-full max-w-md mx-auto  shadow-md rounded-lg px-4 py-3 my-8 text-white bg-gray-700">  
        <h1 className="text-white text-center">Password Generator</h1>
        
        <div className="flex shadow rounded-lg overflow-hidden mb-4 my-3">
          <input 
            type="text" 
            value={password}
            className="bg-white text-black outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button 
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer">
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
              type="range" 
              min={4}
              max={25}
              value={length}
              onChange={(e)=>{
                setLength(e.target.value);
              }}
              className="cursor-pointer"
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={(event)=>{
                if(event.target.checked){
                  setCharAllowed(true);
                }
                else setCharAllowed(false);
              }} 

            />
            <label>Special Char</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox" 
              defaultChecked={numberAllowed}
              onChange={(e)=>{
                if(e.target.checked){
                  setNumberAllowed(true);
                }
                else setNumberAllowed(false);
              }}

            />
            <label>Number</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
