module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // 경로 별칭 사용 시
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Babel을 통한 JS, TS 변환
  },
  collectCoverageFrom: [
    'src/**/*.{js,ts,jsx,tsx}',  // 커버리지 수집 범위 설정
  ],
};
