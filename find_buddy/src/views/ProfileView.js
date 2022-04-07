import React, { useState, useEffect } from 'react'
import { Grid, Paper, MenuItem, TextField, Select, OutlinedInput, InputLabel } from '@mui/material'
import axios from "axios";
import Multiselect from 'multiselect-react-dropdown';

const ProfileView = () => {

    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            const result = await axios('http://localhost:8080/api/skill');
            setSkills(result.data);
        }
        fetchSkills();
    }, []);

    const defaultValues = {
        bio: "",
        profession: "",
        expertise: "",
        experience: "",
    }

    const [formValues, setFormValues] = useState(defaultValues);

    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    return (
        <>
            <Paper elevation={10} style={{ margin: "5vh 35%", height: "auto", width: "auto" }} className="page-content" >
                <fieldset>
                    <h2 style={{ textAlign: "center", marginTop: "5px" }} className="wizard-heading">
                        Create Profile Form
                    </h2>
                    <form>
                        <div style={{ maxWidth: "95%", margin: "auto" }}>
                            <Grid
                                container
                                spacing={3}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Grid item l={12}>
                                    <TextField
                                        id="bio"
                                        value={formValues.bio}
                                        onChange={handleInputChange}
                                        name="bio"
                                        label="Bio"
                                        type="text"
                                        style={{ width: 450 }}
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item l={12}>
                                    <TextField
                                        id="profession"
                                        value={formValues.profession}
                                        onChange={handleInputChange}
                                        name="profession"
                                        label="Profession *"
                                        type="text"
                                        style={{ width: 450 }}
                                        select
                                        variant="outlined"
                                    >
                                        <MenuItem value="Student">Student</MenuItem>
                                        <MenuItem value="Working Professional">Working Professional</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item l={12}>
                                    <TextField
                                        id="expertise"
                                        value={formValues.expertise}
                                        onChange={handleInputChange}
                                        name="expertise"
                                        label="Expertise *"
                                        type="text"
                                        style={{ width: 450 }}
                                        select
                                        variant="outlined"
                                    >
                                        <MenuItem value="Front End Developer">Front End Developer</MenuItem>
                                        <MenuItem value="Back End Developer">Back End Developer</MenuItem>
                                        <MenuItem value="Full Stack Developer">Full Stack Developer</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item l={12}>
                                    <TextField
                                        id="experience"
                                        value={formValues.experience}
                                        onChange={handleInputChange}
                                        name="experience"
                                        label="Experience *"
                                        type="number"
                                        style={{ width: 450 }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item l={12}>
                                    <Multiselect
                                        style={{
                                            multiselectContainer: {
                                                width: 450,
                                                height: 56
                                            }
                                        }
                                        }
                                        options={skills} // Options to display in the dropdown
                                        onRemove={(event) => {
                                            setSelectedSkills(event);
                                            console.log(selectedSkills)
                                        }}
                                        onSelect={(event) => {
                                            setSelectedSkills(event);
                                            console.log(selectedSkills)
                                        }}
                                        displayValue="skill" // Property name to display in the dropdown options
                                        showCheckbox
                                        placeholder="Select all your relevant skills"
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                </fieldset>

            </Paper>
        </>
    )
}

export default ProfileView