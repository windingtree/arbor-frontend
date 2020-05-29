import React from 'react';

export default props => {
    const {
        title,
        verified,
        sslVerified,
        deployed,
        assertion,
        removed,
        onClick,
        onRemove
    } = props;
    return (
        <div>
            {!assertion.proof &&
                <span onClick={onClick}>
                    {title}
                </span>
            }
            {assertion.proof &&
                <a
                    href={assertion.proof}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    {title}
                </a>
            }
            {(!verified && deployed) &&
                <>
                    <span>; not verified</span>
                    <span onClick={() => onRemove(assertion)}>; remove</span>
                </>
            }
            {(verified && deployed) &&
                <>
                    <span>; verified</span>
                    <span onClick={() => onRemove(assertion)}>; remove</span>
                </>                
            }
            {sslVerified &&
                <span>; domain SSL sertificate verified</span>
            }
            {removed &&
                <span>; removed</span>
            }
            {((!deployed && assertion.type) || removed) &&
                <span>; not deployed yet</span>
            }
        </div>
    );
};
