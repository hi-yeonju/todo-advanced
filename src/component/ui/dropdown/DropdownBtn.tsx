"use client"
import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";

const DropdownBtn = ({
    data
}:{
    data:Dropdown[]
}) => {

    const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 요소 감지용 ref

    const [dropdownActive, setDropdownActive] = useState(false)
    const toggle = () => {
        setDropdownActive(prev => !prev)
    }

      // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(e.target as Node)
        ) {
            setDropdownActive(false);
        }
        };

        if (dropdownActive) {
        document.addEventListener('mousedown', handleClickOutside);
        } else {
        document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownActive]);

    
    return (
        <div className="relative">
            <button className="p-2 rounded hover:bg-gray-100 leading-1" onClick={toggle}>
                ⋮
            </button>

            {dropdownActive && (
            <div ref={dropdownRef}>
                <Dropdown
                    data={data}
                />
            </div>
            )}
        </div>
    );
}

export default DropdownBtn;