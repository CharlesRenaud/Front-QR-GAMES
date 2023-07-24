import React, {useEffect, useRef } from 'react';

const Loading = (props) => {
    

    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            // console.log(props.props)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialRender]);

    return (
        <div className='loading'>
            <h1>Chargement en cours</h1>
        </div>
    );
};

export default Loading;