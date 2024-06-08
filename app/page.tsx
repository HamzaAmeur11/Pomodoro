'use client'

import About from "@/components/About";
import Alarm from "@/components/Alarm";
import ModalSetting from "@/components/ModalSetting";
import Navigation from "@/components/Navigation";
import Timer from "@/components/Timer";
import { Dispatch, SetStateAction, useEffect, useRef, useState , RefObject} from "react";


export default function Home() {
	const [pomodoro, setPomodoro] = useState(25)
	const [short, setShort]= useState(5)
	const [long, setLong] = useState(10);
	const [sec, setSec] = useState(0);
	const [stage, setStage] = useState(0);
	const [ticking, setTicking] = useState(false);
	const [consumeSecond, setConsumeSecond] = useState(0);
	const [isTimeUp, setIsTimeUp] = useState(false);
	const [openSetting, setOpenSetting] = useState(false);
	const alarmRef = useRef<HTMLAudioElement>();
	const pomodoroRef = useRef<HTMLInputElement>(null);
	const shortBreakRef = useRef<HTMLInputElement>(null);
	const longBreakRef = useRef<HTMLInputElement>(null);

	const switchStage =(i: number) =>{
		const isYes = consumeSecond && stage !== i ?confirm("Are you sure you want to switch stage?"): false;
		if (isYes) {
			reset();
			setStage(i);
		}else if (!consumeSecond){
			setStage(i);
		}
		setStage(i);
	}

	const getTickingTime = (): number =>{
		const timeStage : { [key: number]: number }  = {
			0: pomodoro,
			1: short,
			2: long,
		}
		return timeStage[stage];
	}

	const updateMinutes = () =>{
		const updateStage : { [key: number]: Dispatch<SetStateAction<number>> }  = {
			0: setPomodoro,
			1: setShort,
			2: setLong,
		}
		return updateStage[stage];
	}


	const timeUp = () => {
		setIsTimeUp(true);
		if (alarmRef.current) {
			(alarmRef.current as HTMLAudioElement).play();
		}
		reset();
	}

	const muteAlarm = () => {
		if (alarmRef.current) {
			(alarmRef.current as HTMLAudioElement).pause();
			(alarmRef.current as HTMLAudioElement).currentTime = 0;
		}
		setIsTimeUp(false);
	}

	const clockTicking = () =>{
		const minutes = getTickingTime();
		const setMinutes = updateMinutes();

		if (minutes === 0 && sec === 0){
			timeUp();
		}else if (sec === 0){
			setMinutes((minutes) => minutes - 1);
			setSec(59);
		}else{
			setSec((sec) => sec - 1);
		}
	}

	const reset = () =>{
		setTicking(false);
		setConsumeSecond(0);
		setSec(0);
		updateTimeDefaultValue();
	}

	const startTimer =() => {
		setIsTimeUp(false);
		muteAlarm();
		setTicking((ticking) => !ticking)
	}

	const updateTimeDefaultValue = () => {
		if (pomodoroRef.current && shortBreakRef.current && longBreakRef.current){
			setPomodoro(parseInt(pomodoroRef.current.value));
			setShort(parseInt(shortBreakRef.current.value));
			setLong(parseInt(longBreakRef.current.value));
		}
		setOpenSetting(false);
		setSec(0);
	}

	useEffect(() => {
		const timer  = setInterval(() => {
			if (ticking){
				setConsumeSecond((value) => value + 1);
				clockTicking();
			}
		}, 1000)
		return () => {clearInterval(timer);}
	}, [sec, pomodoro, short, long, ticking])


	return (
		<div className="bg-gray-500 min-h-screen">
			<div className=" mx-auto max-w-2xl min-h-screen">
				<Navigation setting={openSetting} openSetting={setOpenSetting}/>
				<Timer
					stage={stage}
					switchStage={switchStage}
					getTickingTime={getTickingTime}
					sec={sec}
					ticking={ticking}
					startTimer={startTimer}
					muteAlarm={muteAlarm}
					isTimeUp={isTimeUp}
					reset={reset}
				/>
				<About />
				<Alarm ref={alarmRef as RefObject<HTMLAudioElement>}/>
				<ModalSetting
					openSetting={openSetting}
					setOpenSetting={setOpenSetting}
					pomodoroRef={pomodoroRef}
					shortBreakRef={shortBreakRef}
					longBreakRef={longBreakRef}
					updateTimeDefaultValue={updateTimeDefaultValue}
				/>
			</div>
		</div>
	);
}
