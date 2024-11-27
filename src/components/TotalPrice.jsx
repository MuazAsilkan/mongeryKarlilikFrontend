import { Icon } from '@iconify/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function TotalPrice(props) {

    const response = useSelector((store) => store.data);


    return (
        <div className=' w-full justify-center items-center flex flex-col h-36'>
        <Icon icon="bi:safe-fill" style={{fontSize:'50px',color:'black'}} className='mb-4'/>
        <div>
            <h2 className="text-2xl  text-gray-800 text-center ">{ (Intl.NumberFormat().format(response.data.total) + " USD")}</h2>
        </div>
        </div>
    );
}

export default TotalPrice;