
import {useState,useCallback, useEffect,useRef} from 'react';
import './App.css';

function App() {
  const [length, setlength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("Dheeraj");
  const Refpassword=useRef(null);
  const passwordGenerator=useCallback(
    () => {
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numAllowed) str+="0123456789";
      if(charAllowed) str+="@#$&*";
      for(let i=1;i<=length;i++)
      {
         let c= Math.floor(Math.random()*str.length+1);
         pass+=str.charAt(c);
      }
      setpassword(pass);
      console.log(password);
    },
    [numAllowed,charAllowed,length,setpassword],
    );
    const copyPassword=useCallback(()=>{
      Refpassword.current?.select();
      window.navigator.clipboard.writeText(password);
    },[password]);
    useEffect(() => {
      passwordGenerator();
    }, [length,numAllowed,charAllowed,passwordGenerator])
    
  return (
    <> 
     <div className="container">
        <h1> Password Generator</h1>
       <div className="sub-container1">
          <input type="text" ref={Refpassword} value={password} placeholder="Set length to get password" readOnly/>
          <button onClick={copyPassword}> Copy</button>
       </div>
       <div className="sub-container2">
         <div className="sub-container2-1">
         <input type="range" name="length" id="len" min={8} max={30} value={length} onChange={(e)=>{
         setlength(e.target.value)}}/>Length :  {length}
         </div>
         <div className="sub-container2-2">
            <input type="checkbox" name="num" id="n" checked={numAllowed} onChange={(e)=>{setnumAllowed((prev)=>!prev);}}/>
            <label htmlFor="n"> Numbers</label>
         </div>
         <div className="sub-container2-3">
         <input type="checkbox" name="char" id="c" checked={charAllowed} onChange={(e)=>{setcharAllowed((prev)=>!prev);}}/>
         <label htmlFor="c"> Special Characters</label>
         </div>
       </div>

     </div>
    </>
  );
}

export default App;
