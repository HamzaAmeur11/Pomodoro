import About from "@/components/About";
import Navigation from "@/components/Navigation";
import Timer from "@/components/Timer";


export default function Home() {
  return (
	<div className="bg-gray-500 min-h-screen">
		<div className=" mx-auto max-w-2xl min-h-screen">
			<Navigation />
			<Timer />
			<About />
		</div>
	</div>
  );
}
