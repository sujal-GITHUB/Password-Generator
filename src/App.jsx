import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAll, setNumAll] = useState(false);
  const [charAll, setCharAll] = useState(false);
  const [password, setPassword] = useState("");

  //ref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() =>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numAll) str+= "0123456789";
    if(charAll) str+= "!#$%&'()*+,-./:;<=>?@[]^_`{}~";

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length +1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numAll, charAll, setPassword])

  useEffect(()=>{
    passwordGenerator();
  }, [length, numAll, charAll, setPassword])

  const copyPasswordToClipboard = useCallback(()=> {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className='w-full max-w-2xl mx-auto shadow-md rounded-xl px-4 py-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-3xl text-center text-white pb-5 my-3'
        >Password Generator</h1>
        <div className='flex shadow rounded-2xl overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-2 pt-2 px-5 text-pretty font-bold text-black' placeholder='Password'
          readOnly ref={passwordRef}/>
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPasswordToClipboard} >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={50} value={length} className='cursor-pointer' onChange={(e)=>{
              setLength(e.target.value)
            }}/>
            <label className='font-bold px-3'> Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-2 px-3'>
            <input type="checkbox" defaultChecked={numAll} id='numberInput' onChange={()=>{
              setNumAll((prev) => !(prev));
            }} />
            <label className='font-bold'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-2 px-3'>
            <input type="checkbox" defaultChecked={charAll} id='characterInput' onChange={()=>{
              setCharAll((prev) => !(prev));
            }} />
            <label className='font-bold'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
