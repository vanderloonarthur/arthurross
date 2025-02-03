require 'webrick'
require 'json'

class FeedbackHandler < WEBrick::httpservlet::AbstractServlet
  def do_POST(request, response)
    if request.path == "/api/handle_feedback"
      begin
        # Read the request body
        body = request.body
        # Parse the incoming JSON data
        feedback_data = JSON.parse(body)
        selected_feedback = feedback_data['selectedFeedback']
        additional_comments = feedback_data['additionalComments']
        
        # Process and log the feedback data
        puts "Received Feedback: #{selected_feedback}"
        puts "Additional Comments: #{additional_comments}"
        
        # Respond with a success message
        response.status = 200
        response['Content-Type'] = 'application/json'
        response.body = { message: 'Feedback received successfully.' }.to_json
      rescue JSON::ParserError => e
        # Handle JSON parsing error
        response.status = 400
        response['Content-Type'] = 'application/json'
        response.body = { error: 'Invalid JSON format.' }.to_json
      end
    else
      # Handle requests to other endpoints
      response.status = 404
      response['Content-Type'] = 'text/plain'
      response.body = "Page not found"
    end
  end
end

# Configure server to listen on port 4000
server = WEBrick::httpserver.new(Port: 4000)

# Mount servlet to handle feedback requests
server.mount '/api/handle_feedback', FeedbackHandler

# Gracefully shutdown server on interrupt (Ctrl+C)
trap('INT') { server.shutdown }

# Start the server
server.start
