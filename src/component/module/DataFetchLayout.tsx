import { UseInfiniteQueryResult, UseQueryResult } from "@tanstack/react-query";
import React from "react";

const DataFetchLayout = ({
    fetchData,
    checkData,
    useArray = true,
    checkNone = true,
    skeleton,
    children,
    placeholder = '등록된 게시글이 없습니다.',
}:{
    fetchData: UseQueryResult<any> | UseInfiniteQueryResult;
    checkData?: any;
    useArray?: boolean;
    checkNone?: boolean;
    skeleton?: React.ReactNode;
    children: (props: { data: any; }) => React.ReactNode;
    placeholder?:string
}): React.ReactNode => {


    const { data:dataOrigin, isLoading, isError } = fetchData


    if (isError) return <div className="text-center text-sm text-gray-400 py-5">api 통신 에러로 불러오지 못했습니다.</div>;

    if(isLoading) {

        if(skeleton) return skeleton;

        return (
            <div className="text-center text-sm text-gray-400 py-5">
                <p>로딩중</p>
            </div>
        )
    }

    const handleData = (data:any) => {
  
        if(data?.result == 'error') {
            return <div className="text-center text-sm text-gray-400 py-5">데이터 에러로 불러오지 못했습니다.</div>;
        }

        if(data?.result == "expire") {
            return <div className="text-center text-sm text-gray-400 py-5">토큰이 만료되었습니다.</div>;
        }

        if(data?.result == "not") {
            return <div className="text-center text-sm text-gray-400 py-5">토큰이 없습니다.</div>;
        }
        

        if (!data) {
            if(checkNone){
                return <div className="text-center text-sm text-gray-400 py-5">{placeholder}</div>;
            } else {
                return <></>
            }
        }

        if(useArray){
            if(checkNone){
                if (Array.isArray(data) && data.length === 0) {
                    return <div className="text-center text-sm text-gray-400 py-5">{placeholder}</div>;
                }
            }
        }
       

        return children({ data: data })
    }
    

    if(checkData){

        return handleData(checkData);

    } else {
        
        return handleData(dataOrigin);

    }


}

export default DataFetchLayout;