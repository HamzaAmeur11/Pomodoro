import React from 'react'

export default function Timer() {
	const options = ["Pomodoro", "Short Break", "Long Break"]
	return (
		<div className='w-10/12 mx-auto pt-5 flex flex-col justify-center items-center mt-10 text-white'>
			<div className='flex gap-5 items-center'>
				{options.map((option, index) => {
					return (<h1 className={`${index === 0 ? "bg-blue-700 bg-opacity-30" : ""}  cursor-pointer p-1 transition-all rounded`} key={index}>{option}</h1>)
				})}
			</div>
			<div className='mt-10 mb-10'>
				<h1 className='text-8xl font-bold select-none m-0'>25:00</h1>

			</div>
		</div>
	)
}

