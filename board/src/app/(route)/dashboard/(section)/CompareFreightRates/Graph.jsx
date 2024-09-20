import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { COLORS } from '@/app/_constant/color';

// Chart.js 및 플러그인 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  Filler,
);

const Graph = ({ predictions = {} }) => {
  // predictions 데이터에서 x축 레이블과 y축 데이터를 생성
  const labels = Object.keys(predictions).map((key) => {
    // 키에서 월과 년을 추출하여 레이블 생성 (예: '(2025,2)' -> '2025년 2월')
    const [year, month] = key.replace(/[()]/g, '').split(',');
    return { year, month };
  });

  const dataValues = Object.values(predictions);

  // y축 최소값과 최대값을 데이터에서 동적으로 추출
  const minYValue = Math.min(...dataValues);
  const maxYValue = Math.max(...dataValues);
  const yRange = maxYValue - minYValue;
  const stepSize = yRange / 2; // 2단계로 나눔

  // 그래프 데이터와 옵션 설정
  const data = {
    labels,
    datasets: [
      {
        label: '운임 비용',
        data: dataValues, // y축 값
        borderColor: 'transparent', // 선의 색상을 투명하게 설정
        backgroundColor: 'rgba(76, 119, 231, 0.2)', // 그래프 아래 영역을 채우는 색상 (반투명 파란색)
        pointRadius: 0, // 포인트 제거
        fill: true, // 영역 채우기 활성화
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // 그래프의 종횡비를 유지하지 않음
    spanGaps: true, // 데이터 간 간격을 채움
    scales: {
      y: {
        min: minYValue, // y축 최소값
        max: maxYValue + stepSize * 0.5, // y축 최대값을 조금 더 높게 설정하여 텍스트가 잘리지 않도록 함
        ticks: {
          stepSize: stepSize, // y축 스텝 크기
          callback: (value) => `${value}`, // y축 레이블 표시
        },
        grid: {
          display: false, // y축 격자 제거
        },
      },
      x: {
        display: false, // x축 레이블 표시하지 않음
      },
    },
    layout: {
      padding: {
        top: 20, // 그래프 위쪽에 패딩을 추가하여 텍스트가 잘리지 않도록 함
        bottom: 20, // 그래프 아래쪽에 패딩을 추가하여 텍스트가 잘리지 않도록 함
      },
    },
    plugins: {
      legend: {
        display: false, // 상단 범례 표시 여부
      },
      datalabels: {
        align: 'top', // 데이터 레이블을 맨 위로 정렬
        anchor: 'end', // 포인트 근처에 표시
        clip: false, // 클립핑 방지
        formatter: (value, context) => {
          const index = context.dataIndex;
          const prevValue = index > 0 ? dataValues[index - 1] : value;
          const difference = value - prevValue;
          const direction = difference > 0 ? '↑' : '↓';
          const { month } = labels[index];

          // 두 줄로 표시: 월 정보와 변화량
          return [`${month}월`, `${Math.abs(difference)} ${direction}`];
        },
        font: (context) => {
          const index = context.dataIndex;
          // 첫 번째 줄과 두 번째 줄에 다른 스타일을 적용
          return context.dataset.data[index] === context.raw
            ? {
                size: 14,
                weight: '500', // medium
              }
            : {
                size: 16,
                weight: 'bold',
              };
        },
        color: (context) => {
          // 증가 추세일 경우 파란색, 감소 추세일 경우 빨간색
          const index = context.dataIndex;
          const prevValue =
            index > 0 ? dataValues[index - 1] : dataValues[index];
          const difference = dataValues[index] - prevValue;
          return difference > 0 ? COLORS.point : COLORS.red;
        },
        offset: 0, // 레이블의 오프셋을 조정하여 텍스트가 짤리지 않도록 함
        textAlign: 'right',
      },
    },
  };

  return (
    <div>
      {/* 그래프의 높이와 너비를 설정합니다. */}
      <div style={{ height: '200px', width: '100%' }}>
        <Line data={data} options={options} />
      </div>
      <p style={{ textAlign: 'right', marginTop: '10px' }}>
        상기 예측값은 실제와 다를 수 있습니다.
      </p>
    </div>
  );
};

export default Graph;
