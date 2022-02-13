import React, { useCallback } from 'react';


type Props = {
    title: string,
    index: number;
    selectedTabTitle: string;
    setSelectedTab: (index: number) => void

}

const TabTitle: React.FC<Props> = ({ title, setSelectedTab, index, selectedTabTitle }) => {
    const onClick = useCallback(() => {
        setSelectedTab(index)
    }, [setSelectedTab, index])

    return (
        <div onClick={onClick} className={'tab' + (selectedTabTitle === title ? " --active" : "")}>
            <span >{title}</span>
        </div>

    )

}

export default TabTitle
