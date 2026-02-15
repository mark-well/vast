
function UploadBox() {
    return (
        <>
            <div className="upload-container max-w-96 min-w-80 w-5/6 border-dashed border border-(--secondary-color) mt-16 min-h-56 justify-center bg-(--secondary-bg) text-(--text-primary) rounded-2xl flex flex-col p-4 items-center gap-y-12">
                <div className='flex flex-col items-center gap-y-1 max-w-44'>
                    <h2 className='text-sm text-center'>Upload your material here to start generating reviewer.</h2>
                    <p className='text-xs text-(--text-secondary) text-center'>Note: only pdf are currently supported.</p>
                </div>
                <input className='text-sm bg-(--secondary-color) p-2.5 text-white rounded-xs max-w-32' type='file' />
            </div>
        </>
    );
}

export default UploadBox;