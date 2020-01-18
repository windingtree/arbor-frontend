import React from "react";
const OrgIdGridItem = (props) => {
    const { name, address, isSub, subs, segment, trustLevel } = props;

    return (
        <div>
            <div>[AVA]</div>
            <div>
                {isSub ?
                    <div>
                        [SUBORG]
                        {segment ?
                            <div>{segment}</div>
                            :
                            null
                        }

                    </div>
                    :
                    <div>
                        Legal entity{typeof subs === "number" ?
                        <span>include {subs} Sub-Ord</span>
                        :
                        null }
                    </div>
                }
            </div>
            <div>{name}</div>
            <div>{address}</div>
            <div>{trustLevel}</div>
        </div>
    )
};

export default OrgIdGridItem;
