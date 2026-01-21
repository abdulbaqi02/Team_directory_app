/**
 * EmployeeCard Component
 * Displays individual employee information in a card format
 */
import './EmployeeCard.css';

const EmployeeCard = ({ employee }) => {
    const { firstName, lastName, role, id } = employee;

    // Generate initials for avatar
    const initials = `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();

    // Generate a consistent color based on employee ID
    const getAvatarColor = (id) => {
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        ];
        return colors[id % colors.length];
    };

    return (
        <div className="employee-card">
            <div className="card-content">
                <div
                    className="employee-avatar"
                    style={{ background: getAvatarColor(id) }}
                >
                    {initials}
                </div>
                <div className="employee-info">
                    <h3 className="employee-name">
                        {firstName} {lastName}
                    </h3>
                    <p className="employee-role">{role}</p>
                </div>
            </div>
            <div className="card-footer">
                <span className="employee-id">ID: {id}</span>
            </div>
        </div>
    );
};

export default EmployeeCard;
