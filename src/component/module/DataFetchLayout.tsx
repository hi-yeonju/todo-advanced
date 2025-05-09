import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';

// 제네릭 타입을 사용하여 데이터 타입을 명확히 지정
interface DataFetchLayoutProps<T> {
    fetchData: UseQueryResult<T>;
    checkData?: T;
    skeleton?: React.ReactNode;
    placeholder?: string;
    renderError?: (error: unknown) => React.ReactNode;
    renderLoading?: () => React.ReactNode;
    renderEmpty?: () => React.ReactNode;
    children: (props: { data: T }) => React.ReactNode;
}

function DataFetchLayout<T>({
    fetchData,
    checkData,
    skeleton,
    placeholder = '등록된 게시글이 없습니다.',
    renderError,
    renderLoading,
    renderEmpty,
    children,
}: DataFetchLayoutProps<T>) {
    const { data, isLoading, isError } = fetchData;

    console.log(data)

    // 로딩 상태 처리
    if (isLoading) {
        if (skeleton) return skeleton;
        return renderLoading ? renderLoading() : (
            <div className="text-center text-sm text-gray-400 py-5">
                <p>로딩중</p>
            </div>
        );
    }

    // 에러 상태 처리
    if (isError) {
        return renderError ? renderError(fetchData.error) : (
            <div className="text-center text-sm text-gray-400 py-5">
                api 통신 에러로 불러오지 못했습니다.
            </div>
        );
    }

    // 데이터가 없을 경우 처리
    const renderData = checkData ?? data;
    if (!renderData || (renderData && Array.isArray(renderData) && renderData.length < 1)) {
        return renderEmpty ? renderEmpty() : (
            <div className="text-center text-sm text-gray-400 py-5">{placeholder}</div>
        );
    }

    // 데이터를 정상적으로 불러온 경우 children 렌더링
    return children({ data: renderData });
}

export default DataFetchLayout;
