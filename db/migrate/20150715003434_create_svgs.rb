class CreateSvgs < ActiveRecord::Migration
  def change
    create_table :svgs do |t|
      t.text :innerhtml

      t.timestamps null: false
    end
  end
end
