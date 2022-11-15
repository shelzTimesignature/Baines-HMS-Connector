export default function InputComponent({type='text',title,...props}){
    return (
        <label>
            {
                title && (
                    <span className="block text-[10px] mb-3 tracking-[3px] uppercase">{title}</span>
                )

            }
            <>
                {
                    type==='textarea' ? (
                        <textarea
                            rows={5}
                            className='input'
                            {...props}
                        />
                    ) : type==='select' ? (
                        <select
                            className='input'
                            {...props}
                        />
                    ) :type==='radio' ? (
                        <input
                            type={type}
                            {...props}
                        />
                    ) : (
                        <input
                            type={type}
                            className='input'
                            {...props}
                            autoCorrect='true'

                        />
                    )
                }
            </>
        </label>
    )
}