"""empty message

Revision ID: 81d8808c71b3
Revises: 20ae5aa78fbd
Create Date: 2023-08-28 18:44:43.525390

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '81d8808c71b3'
down_revision = '20ae5aa78fbd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorite_user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('follower_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('followed_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint('favorite_user_user_id_key', type_='unique')
        batch_op.create_unique_constraint(None, ['follower_id'])
        batch_op.create_unique_constraint(None, ['followed_id'])
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorite_user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.create_unique_constraint('favorite_user_user_id_key', ['user_id'])
        batch_op.drop_column('followed_id')
        batch_op.drop_column('follower_id')

    # ### end Alembic commands ###