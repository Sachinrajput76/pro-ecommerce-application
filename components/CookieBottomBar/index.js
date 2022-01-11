const FeatureBar = ({
    title,
    description,
    action,
    hide,
}) => {
    return (
        !hide
            ? <div className='cookie_main'>
                <div className='container'>
                    <div className='cookie_content'>
                        <span className="block md:inline">{title}</span>
                        <span className="block mb-6 md:inline md:mb-0 md:ml-2">
                            {description}
                        </span>
                        {action && action}
                    </div></div>
            </div>
            : ""
    )
}

export default FeatureBar
