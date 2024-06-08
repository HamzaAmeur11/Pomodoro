import React, { Dispatch, MutableRefObject, SetStateAction, RefObject } from 'react';
import { FiX } from 'react-icons/fi'


interface Setting {
	openSetting: boolean,
	pomodoroRef:  RefObject<HTMLInputElement>,
	shortBreakRef:  RefObject<HTMLInputElement>,
	longBreakRef:  RefObject<HTMLInputElement>,
	setOpenSetting: Dispatch<SetStateAction<boolean>>,
	updateTimeDefaultValue: ()=> void,
}

function ModalSetting({pomodoroRef, shortBreakRef, longBreakRef, openSetting, setOpenSetting, updateTimeDefaultValue} : Setting) {

	const inputs = [
		{
			value: "Pomodoro",
			ref: pomodoroRef,
			defaultValue: 25,
		},
		{
			value: "Short Break",
			ref: shortBreakRef,
			defaultValue: 5,
		},
		{
			value: "Long Break",
			ref: longBreakRef,
			defaultValue: 10,
		},
	];



	return (
		<>
			<div className={`absolute w-full h-full left-0 top-0 bg-black bg-opacity-30 ${openSetting? "": "hidden"}`}
				onClick={() => setOpenSetting(!openSetting)}
			>

			</div>
			<div
				className={`absolute max-w-xl bg-white sm:w-96 w-11/12 left-1/2 top-1/2 p-5 rounded-md ${openSetting? "": "hidden"}`}
				style={{
					transform: "translate(-50%, -50%)",
				}}
			>
				<div className='text-gray-300 flex items-center justify-between'>
					<h1 className='uppercase font-bold  tracking-wide'>Time Setting</h1>
					<FiX className='text-2xl cursor-pointer' onClick={() => setOpenSetting(!openSetting)}/>
				</div>
				<div className='h-1 w-full bg-gray-400 mt-5 mb-5'></div>
				<div className='flex'>
					{inputs.map((input, index) => {
						return <div key={index}>
							<h1 className='text-gray-400 text-sm'>{input.value}</h1>
							<input
								className='w-full text-black bg-gray-400 bg-opacity-30 py-2 rounded outline-none text-center'
								defaultValue={input.defaultValue}
								type="number"
								ref={input.ref}
							/>
						</div>
					})}
				</div>
				<button className='bg-green-500 uppercase w-full mt-5 text-white rounded py-2 '
					onClick={() => updateTimeDefaultValue()}
				>
					Save
				</button>
			</div>
		</>
	)
}

export default React.memo(ModalSetting);
