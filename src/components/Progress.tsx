

const Progress = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">Customizing Your Logo</h2>
        <div className="flex items-center mb-4">
          <svg

            
className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"

            
xmlns="http://www.w3.org/2000/svg"

            
fill="none"

            
viewBox="0 0 24 24"
          >

            
<circle
 
className="opacity-25"
 
cx="12"
 
cy="12"
 
r="10"
 
stroke="currentColor"
 
stroke-width="4"></circle>

            
<path
 
className="opacity-75"
 
fill="currentColor"
 
d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>

          
</svg>

          
<p>Please wait while we customize your token logo.</p>
        </div>
      </div>
    </div>
  );
};

export default Progress;