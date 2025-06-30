"""Add price to tours table

Revision ID: 4c9130df4e8f
Revises: e64a0edcf47c
Create Date: 2025-06-30 18:57:34.118233

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4c9130df4e8f'
down_revision = 'e64a0edcf47c'
branch_labels = None
depends_on = None


def upgrade():
    # Step 1: Add the price column as nullable temporarily
    with op.batch_alter_table('tours', schema=None) as batch_op:
        batch_op.add_column(sa.Column('price', sa.Float(), nullable=True))

    # Step 2: Set a default value (e.g., 0.0 or any safe float)
    op.execute("UPDATE tours SET price = 0.0")

    # Step 3: Make the column non-nullable
    with op.batch_alter_table('tours', schema=None) as batch_op:
        batch_op.alter_column('price', nullable=False)



def downgrade():
    with op.batch_alter_table('tours', schema=None) as batch_op:
        batch_op.drop_column('price')
