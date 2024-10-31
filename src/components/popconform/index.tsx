import { Popconfirm, Tooltip, } from 'antd';
import { ConfirmationProps } from './types';



const DeleteConform: React.FC<ConfirmationProps> = ({ title, onConfirm, children }) => {
  return (
    <Popconfirm title={title} onConfirm={onConfirm}>
      <Tooltip>
        {children}
      </Tooltip>
    </Popconfirm>
  );
};

export default DeleteConform;
