require "rspec"
require_relative "../app/ttt_ruby"

describe Ttt_game do

  before do
    def get_user_name; "test string" end
  end

  it "should work" do
    welcome_user.must_equal "Required action was test string."
  end
end
