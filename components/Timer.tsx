import React, { Dispatch, SetStateAction } from 'react'
import { FiBellOff } from 'react-icons/fi';

interface Stage{
	stage: number;
	sec: number;
	ticking: boolean;
	isTimeUp: boolean;
	startTimer: ()=> void ;
	switchStage: (i: number) => void,
	getTickingTime: () => number;
	muteAlarm: () => void;
	reset: () => void;
}

export default function Timer({stage, sec, ticking,isTimeUp, startTimer,switchStage, getTickingTime, muteAlarm, reset} : Stage) {
	const options = ["Pomodoro", "Short Break", "Long Break"]
	return (
		<div className='w-10/12 mx-auto pt-5 flex flex-col justify-center items-center mt-10 text-white'>
			<div className='flex gap-5 items-center'>
				{options.map((option, index) => {
					return (<h1 className={`${index === stage ? "bg-blue-700 bg-opacity-30" : ""}  cursor-pointer p-1 transition-all rounded`} onClick={() => switchStage(index)} key={index}>{option}</h1>)
				})}
			</div>
			<div className='mt-10 mb-10'>
				<h1 className='text-8xl font-bold select-none m-0'>{getTickingTime()}:{sec.toString().padStart(2, "0")}</h1>
			</div>
			<div className='flex gap-2 items-center'>
				<button className='px-16 py-2 text-2xl rounded-md bg-white text-blue-500 uppercase font-bold' onClick={startTimer}>{ticking ? "stop" :"start"}</button>
				{
					isTimeUp && <FiBellOff className='text-3xl cursor-pointer text-white' onClick={muteAlarm}/>
				}
			</div>
			<div>
				{ticking && <button onClick={reset} className='uppercase text-white underline mt-5'>reset</button>}
			</div>
		</div>
	)
}

