"""empty message

Revision ID: 99ce500c3445
Revises: b38d4a3a2b97
Create Date: 2023-08-26 22:34:54.572413

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '99ce500c3445'
down_revision = 'b38d4a3a2b97'
branch_labels = None
depends_on = None

def upgrade():
    op.execute("CREATE TYPE punctuation_enum AS ENUM ('1', '2', '3', '4', '5')")

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.alter_column('punctuation',
               existing_type=sa.VARCHAR(),
               type_=sa.Enum('1', '2', '3', '4', '5', name='punctuation_enum'),
               existing_nullable=False,
               # Specify the USING clause to cast existing values
               postgresql_using="punctuation::punctuation_enum")

def downgrade():
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.alter_column('punctuation',
               existing_type=sa.Enum('1', '2', '3', '4', '5', name='punctuation_enum'),
               type_=sa.VARCHAR(),
               existing_nullable=False,
               # Specify the USING clause to cast existing values
               postgresql_using="punctuation::VARCHAR")

    op.execute("DROP TYPE punctuation_enum")