import './App.css'

function App() {
  return (
    <>
      
      <div>
        <div>
          <img src='/src/assets/diagram.jpg' className='diagram'/>
        </div>

        <div className='mvp'>
          <h1>Minimum Viable Product</h1>
          <p>Our website is basically a job tracking tool that will allow developers to keep track of the jobs they applied to. Tech Stacks we plan to use are:</p>

          <p>React for front end</p>
          <p>Express for back end server</p>
          <p>Supabase for the database</p>
          <p>Node for the JavaScript run-time environment</p>

          <p>As for website features, we plan on:
          Allowing users to create an account that will be stored in the database
          The API endpoints will have middleware security
          The user should be able to upload the job they applied to that will store it in a list of jobs they applied.</p>
        </div>
      </div>
    </>
  )
}

export default App
