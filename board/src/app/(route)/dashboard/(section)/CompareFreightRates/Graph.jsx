import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Chart.js에 필요한 컴포넌트를 등록합니다.
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const Graph = ({ predictions = {} }) => {
  // predictions 데이터를 날짜순으로 정렬합니다.
  const sortedPredictions = Object.entries(predictions).sort((a, b) => {
    const aDate = new Date(a[0].replace(',', '-01-'));
    const bDate = new Date(b[0].replace(',', '-01-'));
    return aDate - bDate;
  });

  // 라벨과 데이터를 추출합니다.
  const labels = sortedPredictions.map(([date]) => {
    const month = date.split(',')[1]; // 월만 추출
    return `${parseInt(month, 10)}월`; // '1월', '2월' 등으로 표시
  });

  const dataValues = sortedPredictions.map(([, value]) => value);

  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: dataValues,
        borderColor: 'rgba(76, 119, 231, 0.3)', // 그래프 라인 색상
        backgroundColor: 'rgba(76, 119, 231, 0.3)', // 그래프 채우기 색상
        fill: true, // 내부 색상 채우기 활성화
        borderWidth: 2,
        tension: 0, // 각진 모양으로 설정 (곡선 비활성화)
        pointRadius: 0, // 포인트를 표시하지 않음
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: true,
        align: 'end',
        anchor: 'end',
        font: {
          size: 16, // 폰트 크기 설정
          weight: '500', // Medium 설정
        },
        color: (ctx) => {
          const index = ctx.dataIndex;
          if (index === 0) return 'black'; // 첫 번째 값은 검정색으로 표시

          // 이전 값과 비교하여 색상 결정
          const previousValue = ctx.dataset.data[index - 1];
          const change = ctx.dataset.data[index] - previousValue;
          return change > 0 ? 'red' : 'blue'; // 증가 시 빨간색, 감소 시 파란색
        },
        formatter: (value, ctx) => {
          const index = ctx.dataIndex;
          // 첫 번째 값은 '현재값\n그래프값' 형식으로 표시
          if (index === 0) return `현재\n${value}`;

          // 나머지 값은 변화량과 화살표 표시
          const previousValue = ctx.dataset.data[index - 1];
          const change = value - previousValue;
          const arrow = change > 0 ? '↑' : '↓'; // 변화량이 양수면 `↑`, 음수면 `↓`
          return `${Math.abs(change)}${arrow}`; // 절대값과 화살표를 함께 표시
        },
      },
      legend: {
        display: false, // 범례 표시하지 않음
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const currentValue = tooltipItem.raw;
            const previousValue =
              tooltipItem.dataset.data[tooltipItem.dataIndex - 1];
            if (previousValue !== undefined) {
              const difference = currentValue - previousValue;
              return `현재: ${currentValue}, 이전과의 차이: ${difference > 0 ? '+' : ''}${difference}`;
            }
            return `현재: ${currentValue}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 100, // y축 최소값
        max: 300, // y축 최대값
        ticks: {
          stepSize: 200,
          callback: function (value) {
            if (value === 100 || value === 300) return value;
            return '';
          },
          color: 'rgba(174, 174, 174, 1)', // y축 글자 색상
          font: {
            size: 14, // y축 글자 크기 설정
          },
        },
        grid: {
          display: false, // y축 가로 눈금 비활성화
        },
      },
      x: {
        ticks: {
          color: 'rgba(174, 174, 174, 1)', // x축 글자 색상
          font: {
            size: 14, // x축 글자 크기 설정
          },
        },
        grid: {
          display: true,
          color: 'rgba(215, 215, 215, 1)', // x축 배경 라인 색상 설정
        },
      },
    },
  };

  return (
    <div style={{ width: '100%' }}>
      {/* 전체 컨테이너 높이 설정 */}
      <div style={{ width: '100%', height: '150px' }}>
        {/* 그래프 컨테이너 높이 설정 */}
        <Line data={data} options={options} plugins={[ChartDataLabels]} />
      </div>
      <p
        style={{
          textAlign: 'right',
          marginTop: '10px',
          fontSize: '14px',
          color: 'rgba(174, 174, 174, 1)',
        }}
      >
        상기 예측값은 실제와 다를 수 있습니다.
      </p>
    </div>
  );
};

export default Graph;
