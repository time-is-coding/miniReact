/* src/App.jsx */
import { useState, useEffect } from 'react'

const Test = () => {
  console.log('----- 组件函数被调用 -----')

  const [count, setCount] = useState(0)
    const [flag, setFlag] = useState(false)
    
    

  const click = async () => {
    console.log('🖱️  按钮被点——开始')
    setCount(c => c + 1)      // ①
    setFlag(f => !f)          // ②
    await new Promise(r => setTimeout(r, 0))  // ③
    console.log('⏱️  定时器回调——开始')
    setFlag(f => !f)          // ④
    console.log('⏱️  定时器回调——结束')
  }

  useEffect(() => {
    console.log('🔥 useEffect 执行，count=', count)
    return () => console.log('💥 useEffect 清理，count=', count)
  }, [count])

  return (
    <div>
      <p>{count} / {flag?'T':'F'}</p>
      <button onClick={click}>点我</button>
    </div>
  )
};

export default Test;
