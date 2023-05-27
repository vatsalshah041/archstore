import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../redux/action/listAction';
import { useEffect } from 'react';

export default function Test() {

    const list=useSelector((state)=>state.allLists.lists);
    console.log(list);
    
    const dispatch=useDispatch();

    useEffect(() => {

      dispatch(add([1,2,3]))
    }, [])
    
  return (
    <div>
      
    </div>
  )
}
