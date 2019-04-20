class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :user, :post
  belongs_to :post
end
