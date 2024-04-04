import * as d3 from "d3";
import { useRef, useEffect } from "react";

export default function Chart({
	data = [
		[0, 1],
		[1, 2],
		[2, 3],
		[7, 5],
		[4, 8],
		[5, 13],
		[3, 21],
		[6, 34],
		[8, 55],
		[10, 89],
	],
	width = 640,
	height = 400,
	marginTop = 20,
	marginRight = 20,
	marginBottom = 30,
	marginLeft = 40,
}) {
	const gx = useRef();
	const gy = useRef();
	const x = d3.scaleLinear(d3.extent(data.map((d) => d[0])), [
		marginLeft,
		width - marginRight,
	]);
	const y = d3.scaleLinear(d3.extent(data.map((d) => d[1])), [
		height - marginBottom,
		marginTop,
	]);
	const line = d3
		.line()
		.x((d) => x(d[0]))
		.y((d) => y(d[1]));
	useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
	useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);
	return (
		<svg width={width} height={height}>
			<g ref={gx} transform={`translate(0,${height - marginBottom})`} />
			<g ref={gy} transform={`translate(${marginLeft},0)`} />
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				d={line(data)}
			/>
			<g fill="white" stroke="currentColor" strokeWidth="1.5">
				{data.map((d, i) => (
					<circle key={i} cx={x(d[0])} cy={y(d[1])} r="2.5" />
				))}
			</g>
		</svg>
	);
}
