class Api::JogsController < ApiController
  respond_to :json

  def index
    respond_with :api, Jog.all
  end

  def create
    respond_with :api, Jog.create(jog_params)
  end

  def update
    respond_with :api, Jog.update(params[:id], jog_params)
  end

  def destroy
    respond_with :api, Jog.destroy(params[:id])
  end

  private

    # Only allow a trusted parameter "white list" through.
    def jog_params
      params.require(:jog).permit(:start_time, :user_id, :distance_in_miles, :time_in_hours)
    end
end
