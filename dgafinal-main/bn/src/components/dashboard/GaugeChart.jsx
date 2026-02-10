import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const GaugeChart = ({ value }) => {
    const data = [{ name: 'Completed', value: value, color: '#006C35' }, { name: 'Remaining', value: 100 - value, color: '#E5E7EB' }];
    return (
        <div className="relative w-48 h-48 mx-auto">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" startAngle={180} endAngle={0} innerRadius={60} outerRadius={80} paddingAngle={0} dataKey="value" stroke="none" cornerRadius={10}>
                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                <span className="text-4xl font-bold text-[#111827]">{value}%</span>
                <span className="text-xs font-bold text-gray-400 mt-1">نسبة الامتثال</span>
                <div className="flex gap-4 mt-2 text-[10px] font-bold">
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#006C35]"></span><span className="text-gray-600">نجاح</span></div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-300"></span><span className="text-gray-400">لم يتم</span></div>
                </div>
            </div>
        </div>
    );
};