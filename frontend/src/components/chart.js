import {Area, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const Chart = ({data, factorName, breedName, petName}) => {
    console.log("data", data)

    return (
        <div>
            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={data}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#E59941" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#E59941" stopOpacity={0}/>
                        </linearGradient>

                    </defs>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Area type="monotone" dataKey="averageBreedValue"
                          name={breedName + " " + factorName + " average value"} fillOpacity={1} fill="url(#colorUv)"
                          stroke="#E59941" dot={false}/>
                    <Line type="monotone" dataKey="averageValue" name={petName + " " + factorName + " value"}
                          stroke="#297373" strokeWidth={3} dot={<Dot/>}/>
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

const Dot = (props) => {
    const {cx, cy, value} = props;

    if (value === 0) {
        return null; // Hide the dot when the value is zero
    }

    return (
        <svg x={cx - 4} y={cy - 4} width={8} height={8} fill="#297373" viewBox="0 0 8 8">
            <circle cx={4} cy={4} r={4} fill="#297373"/>
        </svg>
    );
};

export default Chart;