
import { useContext, useState } from "react";
import styles from "./Tabs.module.css";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Block from "./Block";
import { SubjectContext } from "../context/SubjectContext";

function Tabs({ className, subjectId }) {
    const { getModulesFromSubject, addNewModuleToSubject } = useContext(SubjectContext);
    const modules = getModulesFromSubject(subjectId);
    const [activeTab, setActiveTab] = useState(modules[0].id);

    const newModule = () => {
        addNewModuleToSubject(subjectId)
    }

    return (
        <>
            <div className={`flex flex-col grow ${className || ""}`}>
                <div className={`${styles.tabsHeader}`}>
                    {
                        modules.map(tab => (
                            <Button key={tab.id} className={`${styles.tabs} ${activeTab === tab.id ? `${styles.activeTab}` : ""}`} onClick={() => setActiveTab(tab.id)}>{tab.name}</Button>
                        ))
                    }
                    <Button className={`${styles.addModuleButton} text-white`} onClick={newModule} icon={<FontAwesomeIcon icon="fa-solid fa-plus" />}></Button>
                </div>

                {/* Tab Container */}
                <div className={`${styles.tabContentContainer}`}>
                    {
                        modules.find(tab => tab.id === activeTab)?.contents.map(block => {
                            if (block.block_type == "paragraph") {
                                return (
                                    <Block key={block.id} type={block.block_type} title={block.title || ""}>
                                        <p>{block.content}</p>
                                    </Block>
                                )
                            } else if (block.block_type == "orderedList") {
                                return (
                                    <Block key={block.id} type="orderedList" title={block.title} items={block.content}></Block>
                                )
                            } else if (block.block_type == "unorderedList") {
                                return (
                                    <Block key={block.id} type="unorderedList" title={block.title} items={block.content}></Block>
                                )
                            }
                            return null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Tabs;