class Session < ActiveRecord::Base
  before_save :downcase_fields

  def downcase_fields
    self.email.downcase!
  end
end
